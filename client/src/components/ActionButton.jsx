const ActionButton = ({ editingId }) => (
  <button type="submit">{editingId ? 'Update' : 'Add'} Note</button>
);

export default ActionButton;
