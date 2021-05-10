import React from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/react';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

interface HeaderProps {
  logo?: FluidObject;
  pathname?: string;
}

interface HeaderState {
  layananActive?: boolean;
  peraturanActive?: boolean;
  eventActive?: boolean;
  sidemenuActive?: boolean;
  offset?: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      layananActive: false,
      peraturanActive: false,
      eventActive: false,
      sidemenuActive: false,
      offset: 0,
    };
  }

  handleScroll() {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        this.setState({
          offset: window.scrollY,
        });
      };
    }
  }

  resetMenu() {
    this.setState({
      layananActive: false,
      peraturanActive: false,
      eventActive: false,
      sidemenuActive: false,
    });
  }

  render() {
    this.handleScroll();
    return (
      <header
        css={css`
          background: transparent;
          position: relative;
          top: 50px;
          @media (max-width: 1024px) {
            position: fixed;
            z-index: 99999;
            width: 100%;
            top: 0;
          }
          .dropdown-enter {
            opacity: 0;
            transform: translateY(-20px);
          }
          .dropdown-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .dropdown-exit {
            opacity: 1;
          }
          .dropdown-exit-active {
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}
      >
        <div
          tw="w-full flex items-center text-white"
          css={css`
            position: absolute;
            z-index: 9999;
            top: 0px;
            height: 60px;
            transition: background-color 300ms;
            @media (min-width: 1024px) {
              ${this.state?.layananActive ||
              this.state?.peraturanActive ||
              this.state?.eventActive ||
              this.state?.offset > 48
                ? tw`bg-blue-lapis`
                : tw`bg-transparent`}
              /* &:hover {
                ${tw`bg-blue-lapis`}
              } */
              ${this.state?.offset > 48 ? tw`top-0` : tw``}
              ${this.state?.offset > 48 ? tw`fixed` : tw`absolute`}
            }

            @media (max-width: 1024px) {
              ${tw`bg-blue-lapis`}
            }
          `}
        >
          <div tw="container mx-4 lg:mx-auto flex items-center w-full">
            <div
              tw="mr-8 text-xl cursor-pointer lg:hidden"
              className={this.state?.sidemenuActive ? 'icon icon-cross' : 'icon icon-menu'}
              onClick={() => {
                this.setState({
                  sidemenuActive: !this.state?.sidemenuActive,
                  layananActive: false,
                });
              }}
            ></div>
            <Link tw="lg:ml-32" to="/" aria-label="beranda">
              <Img
                fluid={this.props.logo as FluidObject}
                css={css`
                  margin-right: 40px;
                  position: relative;
                  width: 30px;
                  bottom: 0px;
                  @media (min-width: 1024px) {
                    bottom: 0px;
                    width: 48px;
                  }
                `}
              />
            </Link>
            <nav
              tw="flex items-center"
              css={css`
                .subnav {
                  position: relative;
                  & > a {
                    padding: 24px 0;
                    padding-right: 40px;
                  }
                }
                ul {
                  ${tw`bg-blue-lapis`}
                  position: absolute;
                  left: -16px;
                  top: 43px;
                  margin: 0;
                  padding: 0;
                  padding-bottom: 16px;
                  li {
                    list-style: none;
                    margin: 0;
                    a {
                      display: block;
                      margin: 0;
                      padding: 6px 16px;
                      min-width: 350px;
                      transition: background-color 300ms;
                      ${tw`bg-blue-lapis`}
                      &:hover {
                        ${tw`bg-blue-marine`}
                      }
                    }
                  }
                }
                a {
                  cursor: pointer;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 16px;
                  padding: 24px 0;
                  padding-right: 40px;
                  &:hover,
                  &.active {
                    color: #ffffff;
                  }
                  .icon {
                    position: relative;
                    top: 0.2em;
                  }
                }
              `}
            >
              <div
                tw="lg:flex lg:items-center"
                className="secondNav"
                css={css`
                  @media (max-width: 1024px) {
                    transition: left 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    left: ${this.state?.sidemenuActive ? 0 : '-100%'};
                    position: fixed;
                    ${tw`bg-blue-lapis`}
                    width: 320px;
                    height: calc(100vh - 60px);
                    top: 60px;
                    padding-bottom: 16px;
                    a,
                    .subnav > a {
                      display: block;
                      padding: 6px 16px;
                    }
                    ul {
                      position: static;
                      padding-bottom: 0;
                      margin: 12px 0;
                      li {
                        list-style: disc outside none;
                        margin-left: 42px;
                        a {
                          padding-left: 0;
                          min-width: 0;
                        }
                      }
                    }
                    .subnav {
                    }
                  }
                `}
              >
                <Link to="/">Madrasah</Link>
                <Link to="/">Struktur Yayasan</Link>
                <Link to="/">DKM Al Amanah</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
