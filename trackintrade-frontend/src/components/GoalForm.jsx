// src/components/GoalForm.jsx
import { useState, useEffect } from 'react';

const GoalForm = ({ onSubmit, initialData = null, closeModal }) => {
  const [formData, setFormData] = useState({
    goal_type: 'monthly_profit', target_value: '', start_date: '', end_date: ''
  });

  useEffect(() => {
    if (initialData) {
      const formatDate = (dateString) => dateString ? new Date(dateString).toISOString().split('T')[0] : '';
      setFormData({
        goal_type: initialData.goal_type || 'monthly_profit',
        target_value: initialData.target_value || '',
        start_date: formatDate(initialData.start_date),
        end_date: formatDate(initialData.end_date),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label>Goal Type</label>
        <select name="goal_type" value={formData.goal_type} onChange={handleChange}>
          <option value="monthly_profit">Monthly Profit</option>
          <option value="win_rate">Win Rate (%)</option>
          <option value="total_trades">Total Trades</option>
        </select>
      </div>
      <div className="form-group">
        <label>Target Value</label>
        <input name="target_value" type="number" value={formData.target_value} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Start Date</label>
        <input name="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input name="end_date" type="date" value={formData.end_date} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Save Goal</button>
      </div>
    </form>
  );
};

export default GoalForm;