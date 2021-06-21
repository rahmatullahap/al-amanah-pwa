import React from 'react';
import { PageProps, navigate } from 'gatsby';
import 'twin.macro';
import { GetHomeDataQuery } from '../graphql-types';
class Index extends React.Component<PageProps<GetHomeDataQuery>> {
  componentDidMount() {
    navigate('/login');
  }

  render() {
    return <div> Please Wait...</div>;
  }
}

export default Index;
