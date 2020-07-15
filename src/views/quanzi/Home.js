import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { LayHeader, Chat } from "../../component";

const Wrapper = styled.section`
  &.qz-home {
    height: 100%;
    display: flex;
    flex-direction: column;
    .qz-header {
      flex: 1;
      border: 1px solid blue;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .qz-container {
      flex: 12;
      display: flex;
      flex-direction: row;
      .qz-filter {
        flex: 1;
        background-color: yellow;
      }
      .qz-main {
        flex: 5;
        background-color: green;
      }
      .qz-chat {
        flex: 2;
      }
    }
  }
`;

class Qzhome extends Component {
  render() {
    return (
      <Wrapper className="qz-home">
        <header className="qz-header">
          <LayHeader history={this.props.history} />
        </header>

        <div className="qz-container">
          <aside className="qz-filter">左边</aside>
          <main className="qz-main">中间main区域</main>
          <aside className="qz-chat">
            <Chat height={document.documentElement.clientHeight - 100} />
          </aside>
        </div>
      </Wrapper>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

// Connected Component
export default connect(mapStateToProps)(Qzhome);
