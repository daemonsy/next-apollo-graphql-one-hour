import React from 'react';

export default ({ user }) => {
  return (
    <div className="card" style={{height: '100%'}}>
      <div className="card-image">
        <figure className="image">
          <img src={user.avatarUrl} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{user.name || user.login}</p>
            <p className="subtitle is-6">@{user.login}</p>
          </div>
        </div>
        <div className="content">
          {user.company && <p><strong>{user.company}</strong></p> }
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
