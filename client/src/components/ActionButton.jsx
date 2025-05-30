const ActionButton = ({ editingId }) => (
  <button className="action-btn" type="submit">{editingId ? 'Update' : 'Add'} Note</button>
);

export default ActionButton;
