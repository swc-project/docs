/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import Layout from "@theme/Layout";
import { CommonProps } from ".";

export interface User {
  caption: string;
  image: string;
  infoLink: string;
  pinned: boolean;
}

class Users extends React.Component<CommonProps> {
  render() {
    const { config: siteConfig } = this.props;
    if (((siteConfig.customFields.users as User[]) || []).length === 0) {
      return null;
    }

    const editUrl = `https://github.com/swc-project/website/edit/master/website/siteConfig.js`;

    const showcase = (siteConfig.customFields.users as User[]).map((user) => (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    ));

    return (
      <div className="mainContainer">
        <div className="container">
          <div className="showcaseSection">
            <div className="prose">
              <h1>Who is Using This?</h1>
              <p>This project is used by many folks</p>
            </div>
            <div className="logos">{showcase}</div>
            <p>Are you using this project?</p>
            <a href={editUrl} className="button">
              Add your company
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <Layout>
    <Users {...props} />
  </Layout>
);
