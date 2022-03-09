import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
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
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Popover,

} from "@chakra-ui/react";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const Books = () => {
  const [books, setbooks] = useState([]);
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [img, setImages] = useState("");
  const [progress, setProgress] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);


  const firstField = React.useRef();

  const getbooks = async () => {
    const books = await axios
      .get(`${BASE_URL}/Books`)
      .then((dete) => {
        setbooks(dete.data);

        console.log(dete.data);
      });
  };

  useEffect(() => {
    getbooks();
  }, []);
 
  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
      getbooks();

    } else {
      setSearchShow(true);
      getBooksBySearch();

    }
  };

  const getBooksBySearch = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/Books`);
      setbooks(
        result.data.filter((item) => {
         console.log(item,'<<<<<<<<<<');
          return (
            item.title.toLowerCase().includes(searchField.toLowerCase())
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
    getbooks();

  }, [img]);


  const addbook = async () => {
    try {
      await axios.post(
        `${BASE_URL}/addbook`,
        {
          title: title,
          pages: pages,
          price:price,
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
  const updateBooktitle = async (id) => {
    await axios.put(
      `${BASE_URL}/book/updatetitle/${id}`,
      {
        title: title,
      },
    );
    getbooks();

  };

  const updateBookpages = async (id) => {
    await axios.put(
      `${BASE_URL}/book/updateBookpages/${id}`,
      {
        pages: pages,
      },
    );
    getbooks();

  };
  const updateBookprice = async (id) => {
    await axios.put(
      `${BASE_URL}/book/updateBookpages/${id}`,
      {
        price: price,
      },
    );
    getbooks();

  };


  const deleteBook = async (id) => {
    const res = await axios.delete(`${BASE_URL}/book/delete/${id}`, {
    });
    getbooks();
  };

  return (
    <ChakraProvider>

    <section className={"cards-section"}>
    <Button ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
        ADD BOOK  </Button>

      <div className="info__name"><h1>All BOOKS</h1>
      <Input
      
      alignItems="center"
      textAlign="center"
        width="80"
        mt="39"
        bg="#444"
        placeholder="🔍 looking for something..."
        fontSize="1.5rem"
        color="white"
        onChange={handleChange}
      />        </div>
      <Grid m='4' templateColumns='repeat(2, 1fr)' gap={3}>

        {books.map((item) => {
          console.log(item);
          return (
            
            <div className="card">
            <div className="books">
                <img className="img card-imag" src={item.image} alt="img for"  />
                <h1 className="info__name">{item.book}</h1> 
                <h2 className="info__name"> the arther:{item.title}</h2>
                
                <p className="info__name">book pages:{item.pages}</p>
                <p className="info__name">price:{item.price}$</p>
                <Button

color="gray.600"
bg="white"
onClick={() => {
deleteBook(item._id);
}}
>
🗑

</Button>
<Popover size='true'>
  <PopoverTrigger>
    <Button ml='40%' bg='gray.800'   >✏</Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Edit Book </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
                      
      <Input
                id="btubdat"
                onChange={(e) => {
                  updateBooktitle(e.target.value);
                }}
                defaultValue={item.title}
                placeholder="edit title"
              />

              <Button
              colorScheme={'green'}
                className="edit"
                onClick={() =>  setTitle(item._id)}
                
              >
                Edit Book Title
              </Button>
              <Input
mb={5}
mt={5}
                id="btubdat"
                onChange={(e) => {setPages(e.target.value);}}
                defaultValue={item.pages}
                type="number"
                placeholder="edit book pages"
              />

              <Button colorScheme={'green'} className="edit"
                             onClick={(item) => updateBookpages(item._id)}

              > 
              
                Edit book price
              </Button>
<Input
mb={5}
mt={5}
                id="btubdat"
                onChange={(e) => {setPrice(e.target.value);}}
                defaultValue={item.price}
                type="number"
                placeholder="edit book Price"
              />

              <Button colorScheme={'green'} className="edit"
                             onClick={(e) => updateBookprice(e._id)}

              > 
              
                Edit book price
              </Button>
       
      </PopoverBody>
      <PopoverFooter></PopoverFooter>
    </PopoverContent>
  </Portal>
</Popover>

                
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
              <DrawerHeader color="white" >New Book </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel color="white" htmlFor="text">Book titel</FormLabel>
                    <Input
                    bg="white"
                      id="text"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>

                  <Box>
                  <FormLabel color="white" htmlFor="text">Pages </FormLabel>

                  <Input
                    bg="white"
                    type="number"
                    placeholder="Pages"
                      onChange={(e) => setPages(e.target.value)}
                      size="lg"
                    />
                                      <FormLabel color="white" htmlFor="text">Price </FormLabel>

                      <Input
                    bg="white"
                    type="number"
                    placeholder="setPrice"
                      onChange={(e) => setPrice(e.target.value)}
                      size="lg"
                    />
                    <FormLabel color="white" htmlFor="text">Post imege</FormLabel>
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
                  colorScheme="blue"
                  onClick={() => {onClose();addbook()}}
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

  );
};

export default Books;
