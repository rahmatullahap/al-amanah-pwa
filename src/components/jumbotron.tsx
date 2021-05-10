import React from 'react';
import 'twin.macro';
import { css } from '@emotion/react';
import Img, { FluidObject } from 'gatsby-image';

interface JumbotronProps {
  title?: any;
  detail?: any;
  action?: any;
  img?: FluidObject;
  curved?: boolean;
  hideHeader?: boolean;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  detail,
  action,
  img,
  curved = false,
  hideHeader = false,
}) => {
  return (
    <section
      css={css`
        overflow: hidden;
        height: 659px;
        top: 0px;
        position: relative;
        @media (max-width: 1024px) {
          height: 488px;
          top: 0px;
        }
      `}
    >
      <div
        tw="bg-black-100"
        css={css`
          top: -421px;
          position: relative;
          width: calc(100% + 1560px);
          height: 1080px;
          overflow: hidden;
          ${curved
            ? css`
                border-radius: 100%;
              `
            : ``}
          left: -780px;
          @media (max-width: 1024px) {
            top: 0px;
            left: -195px;
            width: calc(100% + 390px);
            height: 300px;
          }
        `}
      >
        <div
          tw="flex justify-center"
          css={css`
            position: absolute;
            left: 780px;
            width: calc(100% - 1560px);
            bottom: 0;
            top: 421px;
            @media (max-width: 1024px) {
              left: 195px;
              ${!hideHeader ? 'top: 0px;' : 'top: calc(115px - 48px);'}
              width: calc(100% - 390px);
            }
          `}
        >
          <Img
            fluid={img as FluidObject}
            css={css`
              height: 100%;
              width: 100%;
            `}
          />
          <div
            tw="w-full h-full flex items-center"
            css={css`
              background-color: rgba(39, 40, 46, 0.64);
              top: 0;
              position: absolute;
            `}
          >
            <div tw="container">
              <div tw="lg:w-1/2 mx-8 lg:mx-32">
                <h1 tw="text-h2 lg:text-h1 text-white">{title}</h1>
                <div tw="text-b1 text-white mb-14">{detail}</div>
                {action}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
