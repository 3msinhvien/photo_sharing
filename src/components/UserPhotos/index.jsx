import React from "react";
import { Typography, Divider, Card, CardMedia, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const {userId} = useParams();
    const user = models.userModel(userId);
    const photos = models.photoOfUserModel(userId);

    if (!user) {
        return <Typography variant="h6">User not found</Typography>;
    }

    if (!photos || photos.length === 0) {
        return <Typography variant="h6">No photos found</Typography>;
    }

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
      <div className="user-photos-container">
        <Typography variant="h5" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>

        {photos.map(photo => (
          <Card key={photo._id}>
            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt={photo.file_name}
            />
            <CardContent>
              <Typography variant="caption" className="photo-date" color="textSecondary">
                {formatDateTime(photo.date_time)}
              </Typography>

              {photo.comments && photo.comments.length > 0 && (
                <div className="comments-section">
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  {photo.comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                      <div className="comment-header">
                        {formatDateTime(comment.date_time)} - 
                        <Link to={`/users/${comment.user._id}`}>
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                      </div>
                      <Typography variant="body1" className="comment-text">
                        {comment.comment}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
}

export default UserPhotos;
