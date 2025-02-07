import React from 'react';
import { Typography, IconButton, Button, useMediaQuery } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: #ffffff;
  border: solid 2px black;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  width: 100%;
  min-width: 280px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  @media (min-width: 700px) {
    margin-bottom: 0;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 12px;
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333333;

  @media (min-width: 700px) {
    font-size: 1.5rem;
  }
`;

const Author = styled(Typography)`
  font-size: 0.9rem;
  color: #666666;
`;

const Url = styled.a`
  color: #3f51b5;
  text-decoration: none;
  font-size: 0.9rem;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const ActionButton = styled(IconButton)`
  color: #3f51b5;
`;

const ViewPostButton = styled(Button)`
  background-color: #3f51b5;
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 20px;
  text-transform: none;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: #303f9f;
  }

  @media (min-width: 700px) {
    width: auto;
    margin-top: 0;
  }
`;

const BlogPostCard = ({ blogObject, showPostedBy, isLiked, user, handleBlogLike, handleBlogDislike, isIndividualPage, commentLength, isRandomBlog }) => {
  const isMobile = useMediaQuery('(max-width:700px)');

  const getInitials = (name) => {
    return name.split(' ').map(part => part.charAt(0)).join('');
  };

  const authorInitials = getInitials(blogObject.author);

  const ShowLikeButton = () => {
    if (isRandomBlog) return null;

    if (!isLiked || user === null) {
      return (
        <ActionButton onClick={handleBlogLike}>
          <FavoriteBorderIcon />
        </ActionButton>
      );
    }
    return (
      <ActionButton onClick={handleBlogDislike}>
        <FavoriteIcon />
      </ActionButton>
    );
  }

  return (
    <Card>
     <CardHeader>
        <AuthorInfo>
          <Avatar>{authorInitials}</Avatar>
          <div>
            <Title variant={isMobile ? 'h6' : 'h5'}>{blogObject.title}</Title>
            <Author variant="body2">by {blogObject.author}</Author>
          </div>
        </AuthorInfo>
        {!isIndividualPage && (
          <RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none', display: 'block', marginTop: isMobile ? '16px' : '0' }}>
            <ViewPostButton variant="contained" fullWidth={isMobile}>View Post</ViewPostButton>
          </RouterLink>
        )}
      </CardHeader>
      <Url href={blogObject.url} target="_blank" rel="noopener noreferrer">
        {blogObject.url}
      </Url>
      {showPostedBy && blogObject.postedBy && (
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
          Posted by: <RouterLink to={`/api/users/${blogObject.postedBy.id}`}>{blogObject.postedBy.username}</RouterLink>
        </Typography>
      )}
      <CardActions>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ShowLikeButton />
          <Typography variant="body2" style={{ marginLeft: '4px' }}>
            {blogObject.likes} likes
          </Typography>
          <RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ActionButton>
              <ChatBubbleOutlineIcon />
            </ActionButton>
            <Typography variant="body2" style={{ marginLeft: '4px' }}>
              {commentLength} comment{commentLength !== 1 ? 's' : ''}
            </Typography>
          </RouterLink>
        </div>
      </CardActions>
    </Card>
  );
};

export default BlogPostCard;