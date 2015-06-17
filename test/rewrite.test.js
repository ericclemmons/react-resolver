import assert from "assert";
import React from "react";

import { resolve, Resolver } from "../src";

const getPost = function(id = 0) {
  return new Promise(function(resolve) {
    resolve({
      id,
      title: "Title",
      content: "<p>Content</p>",
    });
  });
};

@resolve("id", () => 1)
@resolve("post", ({ id }) => getPost(id))
class Post extends React.Component {
  static defaultProps = {
    post: {
      id: 0,
      content: "<p>Default Content</p>",
      title: "Default Title",
    },
  }

  displayName = "Post"

  render() {
    const { id, content, title } = this.props.post;

    return (
      <section>
        <h1>{title} #{id}</h1>

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    );
  }
}

describe("it", function() {
  it("should work", function(done) {
    Resolver
      .resolve(() => <Post id={2} />)
      .then(({ data, Resolved }) => {
        const markup = React.renderToStaticMarkup(<Resolved />);

        assert.equal(markup, "<section><h1>Title #2</h1><div><p>Content</p></div></section>");
      })
      .then(done)
      .catch(done)
    ;
  });
});
