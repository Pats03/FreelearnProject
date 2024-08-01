import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.delete(`/legend/deletemedia/${params.id}`);
    toast.success('Content deleted successfully');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('../all-subs');
}
const DeleteContent = () => {
  return <div>DeleteContent</div>;
};
export default DeleteContent;
