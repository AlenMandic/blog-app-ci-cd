import React from 'react';
import { Typography, IconButton, Button, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  @media (min-width: 480px) {
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

  @media (min-width: 480px) {
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

  &:hover {
    background-color: #303f9f;
  }
`;

const DeleteButton = styled(Button)`
  color: #f44336;
  border-color: #f44336;
  
  &:hover {
    background-color: rgba(244, 67, 54, 0.04);
  }

  @media (min-width: 430px) {
    margin-right: 12px;
  }

  @media (max-width: 415px) {
    margin-bottom: 10px;
  }
`;

const UserPostCard = ({ blogObject, handleDeleteCallback }) => {
  const isMobile = useMediaQuery('(max-width:480px)');

  const getInitials = (name) => {
    return name.split(' ').map(part => part.charAt(0)).join('');
  };

  const authorInitials = getInitials(blogObject.author);

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
      </CardHeader>
      <Url href={blogObject.url} target="_blank" rel="noopener noreferrer">
        {blogObject.url}
      </Url>
      <CardActions>
        <div>
          <DeleteButton
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteCallback}
          >
            Delete
          </DeleteButton>
          <RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none' }}>
            <ViewPostButton variant="contained">View Post</ViewPostButton>
          </RouterLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" style={{ marginRight: '12px' }}>
            {blogObject.likes} likes
          </Typography>
          <RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ActionButton>
              <ChatBubbleOutlineIcon />
            </ActionButton>
          </RouterLink>
        </div>
      </CardActions>
    </Card>
  );
};

export default UserPostCard;