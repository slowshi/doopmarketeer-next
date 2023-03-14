import {
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { FaSearch, FaChevronDown } from 'react-icons/fa'
import { searchTypes, searchColors } from '@/utils/constants'
import { SearchBarParams } from '@/interfaces/SearchBar'
function SearchBar({ value, type, onSubmit }: SearchBarParams) {
  const [input, setInput] = useState('')
  const [searchType, setSearchType] = useState(searchTypes.ADDRESS)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    submitForm()
  }
  const submitForm = async () => {
    if (input === '') return
    onSubmit(searchType, input)
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const isError = false

  useEffect(() => {
    setInput(value)
    setSearchType(type)
  }, [type, value])

  return (
    <form className="w-100" onSubmit={handleFormSubmit}>
      <FormControl isInvalid={isError} mb="2">
        <InputGroup>
          <InputLeftElement>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    borderEndRadius="0"
                    color="white"
                    backgroundColor={searchColors[searchType].dark}
                    _active={isOpen ? { bg: searchColors[searchType].light } : { bg: searchColors[searchType].dark }}
                    _hover={isOpen ? { bg: searchColors[searchType].dark } : { bg: searchColors[searchType].light }}
                    icon={<FaChevronDown />}
                  />
                  <MenuList>
                    <MenuItem onClick={() => setSearchType(searchTypes.ADDRESS)}>Ethereum Address</MenuItem>
                    <MenuItem onClick={() => setSearchType(searchTypes.DOODLE)}>Doodle ID</MenuItem>
                    <MenuItem onClick={() => setSearchType(searchTypes.DOOPLICATOR)}>Dooplicator ID</MenuItem>
                    <MenuItem onClick={() => setSearchType(searchTypes.GENESIS_BOX)} isDisabled>
                      Genesis Box ID
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </InputLeftElement>
          <Input
            borderColor={searchColors[searchType].dark}
            focusBorderColor={searchColors[searchType].dark}
            _hover={{ borderColor: searchColors[searchType].light }}
            borderWidth="3px"
            backgroundColor="white"
            type="text"
            value={input}
            name={searchType}
            onChange={handleInputChange}
            placeholder={
              {
                [searchTypes.ADDRESS]: 'Ethereum Address',
                [searchTypes.DOODLE]: 'Doodle ID',
                [searchTypes.DOOPLICATOR]: 'Dooplicator ID',
                [searchTypes.GENESIS_BOX]: 'Genesis Box',
              }[searchType]
            }
          />
          <InputRightElement>
            <IconButton
              color="white"
              borderStartRadius="0"
              _hover={{ bg: searchColors[searchType].light }}
              backgroundColor={searchColors[searchType].dark}
              aria-label="Search"
              icon={<FaSearch />}
              size="md"
              onClick={() => submitForm()}
            />
          </InputRightElement>
        </InputGroup>
        {isError ? <FormErrorMessage>Ethereum Address required.</FormErrorMessage> : ''}
      </FormControl>
    </form>
  )
}

export default SearchBar
