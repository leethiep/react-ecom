import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'react-bootstrap-icons';
import { useSearchContext } from './SearchContext';

function Input() {
  const { searchQuery, setSearch } = useSearchContext();

  const handleSearch = () => {
    setSearch(searchQuery);
  };

  return (
    <InputGroup className="my-4 p-3 border bg-light input__search text-alight rounded">
      <Button variant="" id="button-addon1" onClick={handleSearch}>
        <Search className='text-primary'/>
      </Button>
      <Form.Control
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
        placeholder='Product, brand, color,...'
        className='border-0 text-secondary '
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
}

export default Input;
