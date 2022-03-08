import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";

import {
  ChakraProvider,
  Box,
  Input,
  FormLabel,
  InputGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Grid,
  Stack,
  Button,
  option,
  Select,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Arthers = () => {
  const [arthers, setarthers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setnationality] = useState("");
  const [img, setImages] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const firstField = React.useRef();

  const getarthers = async () => {
    const Arthers = await axios
      .get(`${BASE_URL}/Arthers`)
      .then((dete) => {
        setarthers(dete.data);

        console.log(dete.data);
      });
  };

  useEffect(() => {
    getarthers();
  }, []);
  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
      getarthers();

    } else {
      setSearchShow(true);
      getArthersBySearch();

    }
  };

  const getArthersBySearch = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/Arthers`);
      setarthers(
        result.data.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchField.toLowerCase())
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setImages([...img, url]);
        });
      }
    );
  };
  useEffect(() => {
    setProgress(0);
    getarthers();

  }, [img]);


  const addArther = async () => {
    try {
      await axios.post(
        `${BASE_URL}/addingArther`,
        {
          name: name,
          age: age,
          nationality:nationality,
          image:img[0],
                },
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: " successfule ",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Opss...! ,something wrong",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const deleteArther = async (id) => {
    const res = await axios.delete(`${BASE_URL}/Arthers/delete/${id}`, {
    });
    getarthers();
  };



  return (
    <>
        <ChakraProvider>

    <section className={"cards-section"}>
    <Button ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
        ADD Arthers  </Button>

      <div className="info__name"><h1>All Arthers</h1>
      <Input
      
      alignItems="center"
      textAlign="center"
        width="80"
        mt="39"
        bg="#444"
        placeholder="🔍 looking for someOne..."
        fontSize="1.5rem"
        color="white"
        onChange={handleChange}
      /> 
      </div>
      <Grid m='4' templateColumns='repeat(2, 1fr)' gap={3}>

        {arthers.map((item) => {
          console.log(item);
          return (
            
            <div className="card">
            <div className="books">
                <img className="img card-imag" src={item.image} alt="img for"  />
                <h1 className="info__name">{item.name}</h1> 
                <h2 className="info__name">age:{item.age}</h2>
                <h2 className="info__name">nationality:{item.nationality}</h2>

                
                <p className="info__name">gender:{item.gender}</p>
                <Button

color="gray.600"
bg="white"
onClick={() => {
  deleteArther(item._id);
}}
>
🗑

</Button>
              </div>
            </div>
          );
        })}
                </Grid>
                <Box>
          {message ? <Box>{message}</Box> : ""}{" "}
          <Drawer
            isOpen={isOpen}
            placement="right"
            initialFocusRef={firstField}
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent bg="rgb(20,30,48)">
              <DrawerCloseButton color="white" />
              <DrawerHeader color="white" >New ARTHERS </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel color="white" htmlFor="text">Arthers name</FormLabel>
                    <Input
                    bg="white"
                      id="text"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>

                  <Box>
                  <FormLabel color="white" htmlFor="text">AGE </FormLabel>

                  <Input
                    bg="white"
                    type="number"
                      onChange={(e) => setAge(e.target.value)}
                      size="lg"
                    />
                                              <FormLabel color="white" htmlFor="text">gender </FormLabel>

                                              <Select  variant='outline' bg='white' placeholder='gender' onChange={(e) => setGender(e.target.value)} >
  <option value='male'>male</option>
  <option value='female'>female</option>
</Select>
{/* <Input
bg="white"
type="text"

onChange={(e) => setGender(e.target.value)}
size="lg"
/> */}
                                      <FormLabel color="white" htmlFor="text">nationality </FormLabel>

                      <Input
                    bg="white"
                    type="text"
                    
                      onChange={(e) => setnationality(e.target.value)}
                      size="lg"
                    />
                    <FormLabel color="white" htmlFor="text">Arthers imege</FormLabel>
                    <InputGroup>
                      <Input
                      bg='white'
                        type="file"
                        accept=".gif,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          uploadPictures(e);
                        }}
                        id="img"
                      />
                    </InputGroup>
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button bg='white' variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  id="signupSubmitButton"
                  colorScheme="green"
                  onClick={() => {onClose();addArther();}}
                >
                  {" "}
                  ADD
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          
        </Box>


    </section>
    </ChakraProvider>

    </>
  );
};

export default Arthers;
