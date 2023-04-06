import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'

const Signup = () => {
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [show,setShow] = useState();

    const submitHandler = ()=>{

    }
  return (
    <VStack>
        <FormControl>
<FormLabel>Name</FormLabel>
<Input type='text' onChange={(e)=>setName(e.target.value)} />
</FormControl>
    <FormControl>
<FormLabel>Email address</FormLabel>
<Input type='email' onChange={(e)=>setEmail(e.target.value)} />
</FormControl>
<FormControl>
<FormLabel>Password</FormLabel>
<InputGroup>
<Input type={show?"text":"password"} onChange={(e)=>setPassword (e.target.value)} />
<InputRightElement>
<Button size={'sm'} h={'70%'} onClick={()=>setShow(!show)}>
{show?<BiHide/>:<BiShow/>}
</Button>
</InputRightElement>
</InputGroup>
<FormLabel>Confirm Password</FormLabel>
<InputGroup>
<Input type={show?"text":"password"} onChange={(e)=>setConfirmPassword (e.target.value)} />
<InputRightElement>
<Button size={'sm'} h={'70%'} onClick={()=>setShow(!show)}>
{show?<BiHide/>:<BiShow/>}
</Button>
</InputRightElement>
</InputGroup>
</FormControl>
<Button className='submitButton' style={{marginTop:"30px"}} isLoading={loading} onClick={submitHandler} colorScheme='orange' w={'100% '} >Login</Button>

</VStack>
  )
}

export default Signup