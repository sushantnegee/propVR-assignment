import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import "./Auth.css";
import { API_LINK } from "../../Config/Api";
import Action from "../../Redux/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../ContextApi/ContextProvider";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState();
  const toast = useToast();

  const {setUser,setLoggedIn} = useContext(AppContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all Fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        `${API_LINK}/user/login`,
        { email, password },
        config
      );
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      // Action(data, dispatch)
      setUser(data);  
      localStorage.setItem("userDetails",JSON.stringify(data));
      setLoading(false);
      setLoggedIn(true);
      navigate('/projects')
      
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <VStack>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button
              size={"sm"}
              right={"1"}
              h={"70%"}
              onClick={() => setShow(!show)}
              bg={"white"}
            >
              {show ? <BiHide size={"2rem"} /> : <BiShow size={"2rem"} />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        className="submitButton"
        style={{ marginTop: "30px" }}
        isLoading={loading}
        onClick={submitHandler}
        colorScheme="blue"
        w={"100% "}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
