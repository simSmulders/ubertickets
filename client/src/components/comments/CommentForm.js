import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import "../../App.css";
import { addComment } from '../../actions/comments'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class CreateComment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      userId: '',
    };

    
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.state);
    console.log(this.state)
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      selectedValue: event.target.value
    });
  };

  render() {
    const initialValues = this.props.initialValues || {};

    return (
      <div>
        <Paper className="styles" >
          <form onSubmit={this.handleSubmit}>
            <br />
            <div>
              <TextField
                label="Comment"
                name="comment"
                id="comment"
                value={this.state.comment || initialValues.comment || ""}
                onChange={this.handleChange}
              />
            </div>
            <br/>
            <div>
              <TextField
                label="`Ticket ID"
                name="ticketId"
                id="ticketId"
                value={this.state.ticketId || initialValues.ticketId || ""}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="User ID"
                name="userId"
                id="userId"
                value={this.state.userId || initialValues.userId || ""}
                onChange={this.handleChange}
              />
              <br/>
            </div>
            <br />
            <Button type="submit">ADD COMMENT</Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default connect(null, {addComment})(CreateComment)