// src/components/TradeForm.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import './TradeForm.css';

const TradeForm = ({ onTradeCreated, onTradeUpdated, initialData = null, closeModal }) => {
  const [formData, setFormData] = useState({
    stock_name: '',
    direction: 'Buy',
    quantity: '',
    entry_price: '',
    exit_price: '',
    entry_timestamp: '',
    exit_timestamp: '',
    strategy: '',
    commission: 0,
    fees: 0
  });
  const [error, setError] = useState('');

  // This effect runs when the component loads or when `initialData` changes.
  // If we are editing a trade (`initialData` is not null), it populates the form.
  useEffect(() => {
    if (initialData) {
      // The datetime-local input requires a specific format 'YYYY-MM-DDTHH:mm'.
      // This function converts the ISO string from the database into that format.
      const formatDateTimeForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Adjust for timezone offset to display the correct local time
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60000));
        return adjustedDate.toISOString().slice(0, 16);
      };

      setFormData({
        stock_name: initialData.stock_name || '',
        direction: initialData.direction || 'Buy',
        quantity: initialData.quantity || '',
        entry_price: initialData.entry_price || '',
        exit_price: initialData.exit_price || '',
        strategy: initialData.strategy || '',
        commission: initialData.commission || 0,
        fees: initialData.fees || 0,
        entry_timestamp: formatDateTimeForInput(initialData.entry_timestamp),
        exit_timestamp: formatDateTimeForInput(initialData.exit_timestamp),
      });
    } else {
      // If we are adding a new trade, ensure the form is blank
      setFormData({
        stock_name: '', direction: 'Buy', quantity: '', entry_price: '',
        exit_price: '', entry_timestamp: '', exit_timestamp: '',
        strategy: '', commission: 0, fees: 0
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // The submit handler now checks if it is editing or creating a new trade.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (initialData) {
        // If we have initialData, we are editing. Send a PUT request.
        const response = await api.put(`/trades/${initialData.id}`, formData);
        onTradeUpdated(response.data); // Call the update callback from props
      } else {
        // Otherwise, we are creating. Send a POST request.
        const response = await api.post('/trades', formData);
        onTradeCreated(response.data); // Call the create callback from props
      }
      closeModal(); // Close the modal on success
    } catch (err) {
      setError('Failed to save trade. Please check your inputs.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trade-form">
      <div className="form-grid">
        <div className="form-group">
          <label>Stock Name</label>
          <input name="stock_name" value={formData.stock_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Direction</label>
          <select name="direction" value={formData.direction} onChange={handleChange}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input name="quantity" type="number" step="any" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Strategy</label>
          <input name="strategy" value={formData.strategy} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Entry Price</label>
          <input name="entry_price" type="number" step="any" value={formData.entry_price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Exit Price</label>
          <input name="exit_price" type="number" step="any" value={formData.exit_price} onChange={handleChange} required />
        </div>
         <div className="form-group">
          <label>Entry Date/Time</label>
          <input name="entry_timestamp" type="datetime-local" value={formData.entry_timestamp} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Exit Date/Time</label>
          <input name="exit_timestamp" type="datetime-local" value={formData.exit_timestamp} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Commission</label>
          <input name="commission" type="number" step="any" value={formData.commission} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fees</label>
          <input name="fees" type="number" step="any" value={formData.fees} onChange={handleChange} />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-actions">
        <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Save Trade</button>
      </div>
    </form>
  );
};

export default TradeForm;