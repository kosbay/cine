import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { Icon } from 'antd';

const Container = styled.div`
  display: block;
  padding-top: 80px;
  padding-bottom: 100px;
  background-color: #23231e
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Posts = styled.div`
  display: flex;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1024px;
  width: calc(((100vh - 112px) / 340px) * 340px);
  justify-content: center;
`;

const StyledCol = styled.div`
  margin: 2px;
  width: 248px;
  height: 255px;

  @media screen and (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #606dc9
`;

const StyledTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: white;
  text-align: center
`;

const InstaFeed = ({ posts, t }) => (
  <Fragment>
    <Container>
      <StyledTitle>
        {t('instagram.subscribe')}
        {'    '}
        |
        {'  '}
        <Link href="https://www.instagram.com/wunder.kz/" target="_blank">
          <Icon type="instagram" />
          {'  '}
          wunder.kz
        </Link>
      </StyledTitle>
      <Posts>
        {
          posts && posts.map(post => (
            <StyledCol key={post.id}>
              <Link href={post.link} target="_blank">
                <CardImage
                  alt={`${post.name} image`}
                  src={post.images.standard_resolution.url || 'http://via.placeholder.com/600x400px'}
                />
              </Link>
            </StyledCol>
          ))
        }
      </Posts>
    </Container>
  </Fragment>
);

InstaFeed.propTypes = {
  t: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withNamespaces()(InstaFeed);
