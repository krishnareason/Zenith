// src/pages/GoalsPage.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import Modal from '../components/Modal';
import GoalForm from '../components/GoalForm';
import Footer from '../components/Footer';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get('/goals');
        setGoals(response.data);
      } catch (err) {
        console.error("Failed to fetch goals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleSaveGoal = async (goalData) => {
    try {
      if (editingGoal) {
        const response = await api.put(`/goals/${editingGoal.id}`, goalData);
        setGoals(goals.map(g => g.id === editingGoal.id ? response.data : g));
      } else {
        const response = await api.post('/goals', goalData);
        setGoals([response.data, ...goals]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save goal", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await api.delete(`/goals/${goalId}`);
        setGoals(goals.filter(g => g.id !== goalId));
      } catch (err) {
        console.error("Failed to delete goal", err);
      }
    }
  };

  const openModal = (goal = null) => { setEditingGoal(goal); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingGoal(null); };

  if (loading) return <> <Header /><div className="loading-container"><h1>Loading Goals...</h1></div></>;

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>My Goals</h1>
          <button onClick={() => openModal()} className="btn-primary">Add New Goal</button>
        </div>
        <div className="notes-grid"> {/* We can reuse the notes-grid style */}
          {goals.length > 0 ? (
            goals.map(goal => (
              <div key={goal.id} className="goal-card"> {/* New specific class */}
                <h3>{goal.goal_type.replace('_', ' ')}</h3>
                <p className="goal-target">Target: {goal.target_value}{goal.goal_type === 'win_rate' ? '%' : ''}</p>
                <p className="goal-dates">
                  {new Date(goal.start_date).toLocaleDateString()} - {new Date(goal.end_date).toLocaleDateString()}
                </p>
                <div className="note-actions">
                  <button onClick={() => openModal(goal)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDeleteGoal(goal.id)} className="btn-delete">Delete</button>
                </div>
              </div>
            ))
          ) : <div className="no-trades">No goals set. Add one to get started!</div>}
        </div>
      </div>
      <Modal title={editingGoal ? "Edit Goal" : "Add New Goal"} isOpen={isModalOpen} onClose={closeModal}>
        <GoalForm onSubmit={handleSaveGoal} initialData={editingGoal} closeModal={closeModal} />
      </Modal>
      <Footer />
    </>
  );
};

export default GoalsPage;