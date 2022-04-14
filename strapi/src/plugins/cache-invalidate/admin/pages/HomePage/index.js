/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect, useRef } from "react";

import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import { Box } from "@strapi/design-system/Box";
import { HeaderLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";
import axios from 'axios';
import { auth } from '@strapi/helper-plugin';


const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async config => {
    config.headers = {
      Authorization: `Bearer ${auth.getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [invalidating, setInvalidating] = useState(false);

  const handleInvalidate = async () => {
    setInvalidating(true);
    const response = await instance('/cache-invalidate/invalidate');
    setInvalidating(false);
  };

  useEffect(async () => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Box background="neutral100">
        <HeaderLayout
          title="Cloudfront Cache Invalidate"
          subtitle="Invalidate the cache, whenever you want to"
          as="h2"
        ></HeaderLayout>
        <Box padding={10} background="neutral100">
          <Button onClick={handleInvalidate}>Invalidate!</Button>
          {invalidating && 'INVALIDATING...'}
        </Box>
      </Box>
    </>
  );
};

export default memo(HomePage);
