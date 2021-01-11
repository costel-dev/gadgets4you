import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Gadgets4You',
  description: 'We sell the best gadgets to make your live easier',
  keywords:
    'electronics, gadgets, buy electronics, buy gadgets, cheap laptops, cheap phones',
};

export default Meta;
