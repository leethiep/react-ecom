import React from "react";
import { Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { setSearchProduct } from "../actions/searchAction";
import { useForm } from "react-hook-form";
import { InputGroup, Button, Form } from "react-bootstrap";

function Input() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    dispatch(setSearchProduct(data.searchQuery));
  };

  return (
    <InputGroup className="my-4 p-3 border bg-light input__search  rounded">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Button variant="" id="button-addon1" type="submit">
            <Search className="text-primary" />
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            placeholder="Product, brand, color,..."
            className="border-0 text-secondary "
            {...register("searchQuery")} 
          />
        </InputGroup>
      </Form>
    </InputGroup>
  );
}

export default Input;
