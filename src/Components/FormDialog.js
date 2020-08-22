import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TextField
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const ADD_FAMILY_MEMBER = gql`
  mutation AddFamilyMember($first_name: String!, $last_name: String!){
    addFamilyMember(first_name: $first_name, last_name: $last_name){
      id
      first_name
      last_name
    }
  }
`;

export default function FormDialog(props){
  let firstNameInput;
  let lastNameInput;
  const [addFamilyMember, { data }] = useMutation(ADD_FAMILY_MEMBER);

  const handleClose = () => {
    props.toggleFormDialog();
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log('event', event);
  };

  return(
    <Dialog open={props.formDialogState} onClose={handleClose}>
    <DialogTitle>Add Family Member</DialogTitle>
    <form
        onSubmit={e => {
          e.preventDefault();
          addFamilyMember({ variables: { first_name: firstNameInput.value, last_name: lastNameInput.value } });
          firstNameInput.value = '';
          lastNameInput.value = '';
        }}
      >
    <DialogContent>
      <DialogContentText>
        Please provide the following information about the family member that you would like to add to the Benefits Dashboard.
      </DialogContentText>
        <Input
          fullWidth
          inputRef={node => {
            firstNameInput = node;
          }}
          placeholder="First Name"
        />
        <Input
          fullWidth
          inputRef={node => {
            lastNameInput = node;
          }}
          placeholder="Last Name"
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
        </DialogActions>
        </form>
    </Dialog>
  );
};
