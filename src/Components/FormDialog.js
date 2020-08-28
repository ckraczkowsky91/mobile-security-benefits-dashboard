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
  mutation AddFamilyMember($first_name: String!, $last_name: String!, $device_type: String){
    addFamilyMember(first_name: $first_name, last_name: $last_name, devices: {device_type: $device_type}){
      first_name
      last_name
      devices{
        device_type
      }
    }
  }
`;

export default function FormDialog(props){
  let firstNameInput;
  let lastNameInput;
  let deviceInput;
  const [addFamilyMember, { data }] = useMutation(ADD_FAMILY_MEMBER);

  const handleClose = () => {
    props.toggleFormDialog();
  };

  return(
    <Dialog open={props.formDialogState} onClose={handleClose}>
    <DialogTitle>Add Family Member</DialogTitle>
    <form
        onSubmit={(event) => {
          event.preventDefault();
          addFamilyMember({ variables: { first_name: firstNameInput.value, last_name: lastNameInput.value, device_type: deviceInput.value } });
          firstNameInput.value = '';
          lastNameInput.value = '';
          deviceInput.value = '';
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
        <Input
          fullWidth
          inputRef={node => {
            deviceInput = node;
          }}
          placeholder="Phone Model"
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
