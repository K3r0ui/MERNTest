import { Result, Button } from 'antd';
function NotFoundPage() {
   return (
   <Result
   status="404"
   title="404"
   subTitle="Not Found PAGE"
   extra={<Button onClick={ async() => {return( window.location = '/');}} type="primary">Back Home</Button>}
 />
   )};

export default NotFoundPage;


