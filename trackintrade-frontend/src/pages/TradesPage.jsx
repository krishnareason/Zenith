// src/pages/TradesPage.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TradeForm from '../components/TradeForm';
import Footer from '../components/Footer';

const TradesPage = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null); // State to track the trade being edited

  // Function to fetch all trades from the API
  const fetchTrades = async () => {
    try {
      setLoading(true);
      const response = await api.get('/trades');
      setTrades(response.data);
    } catch (err) {
      setError('Failed to fetch trades.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run the fetch function once when the component loads
  useEffect(() => {
    fetchTrades();
  }, []);

  // Function to handle the deletion of a trade
  const handleDelete = async (tradeId) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      try {
        await api.delete(`/trades/${tradeId}`);
        // Remove the deleted trade from the local state to update the UI instantly
        setTrades(trades.filter(trade => trade.id !== tradeId));
      } catch (err) {
        setError('Failed to delete trade.');
        console.error(err);
      }
    }
  };
  
  // This function is called by the form when a new trade is successfully created
  const handleTradeCreated = (newTrade) => {
    // Add the new trade to the top of the list for an instant UI update
    setTrades([newTrade, ...trades]);
  };

  // This function runs when a trade is successfully updated
  const handleTradeUpdated = (updatedTrade) => {
    // Find the trade in the list and replace it with the updated version
    setTrades(trades.map(trade => (trade.id === updatedTrade.id ? updatedTrade : trade)));
  };

  // These functions control opening the modal for either adding or editing
  const openAddModal = () => {
    setEditingTrade(null); // Clear any previous editing data
    setIsModalOpen(true);
  };

  const openEditModal = (trade) => {
    setEditingTrade(trade); // Set the specific trade to be edited
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container"><h1>Loading Trades...</h1></div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="loading-container"><h1>{error}</h1></div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>My Trades</h1>
          <button onClick={openAddModal} className="btn-primary">Add New Trade</button>
        </div>
        
        <div className="table-container">
          <table className="trades-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Stock</th>
                <th>Strategy</th>
                <th>Direction</th>
                <th>Net P&L</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trades.length > 0 ? (
                trades.map(trade => (
                  <tr key={trade.id}>
                    <td>{new Date(trade.exit_timestamp).toLocaleDateString()}</td>
                    <td>{trade.stock_name}</td>
                    <td>{trade.strategy}</td>
                    <td>{trade.direction}</td>
                    <td className={trade.profit_loss >= 0 ? 'positive' : 'negative'}>
                      ${parseFloat(trade.profit_loss).toFixed(2)}
                    </td>
                    <td className="action-buttons">
                      <button onClick={() => openEditModal(trade)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(trade.id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-trades">No trades found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        title={editingTrade ? "Edit Trade" : "Add New Trade"} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <TradeForm 
          onTradeCreated={handleTradeCreated}
          onTradeUpdated={handleTradeUpdated}
          initialData={editingTrade}
          closeModal={() => setIsModalOpen(false)} 
        />
      </Modal>
      <Footer />
    </>
  );
};

export default TradesPage;