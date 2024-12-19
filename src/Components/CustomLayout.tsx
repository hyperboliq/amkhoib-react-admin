import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';

const CustomLayout = (props: any) => {
  return (
    <Layout
      {...props}
      appBar={CustomAppBar}
      menu={() => null} // This hides the default sidebar menu
      sidebar={() => null}
    />
  );
};

export default CustomLayout;
