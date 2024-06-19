import { Card, Table, TableBody, TableHead, TableRow, TableCell,
  TablePagination, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText,
TextField, DialogActions, Button, 
Paper,
Typography} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import './Home.css'


interface Product {
  id: number;
  title: string;
  category: string;
  availabilityStatus: string;
  price: number;
  rating: number;
  thumbnail: string;
}
interface Controller {
  page: number;
  rowsPerPage: number;
}
interface FormData {
  thumbnail: string,
  title: string,
  category: string,
  availabilityStatus: string,
  price: number,
  rating: number,
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [controller, setController] = useState<Controller>({
    page: 0,
    rowsPerPage: 10
  });
  const [open, setOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    thumbnail: '',
    title: '',
    category: '',
    availabilityStatus: '',
    price: 0,
    rating: 0,
  });


  useEffect(() => {
    const getData = async () => {
      const url = `https://dummyjson.com/products?limit=${controller.rowsPerPage}&skip=${controller.page * controller.rowsPerPage}`;
      try {
        const response = await axios.get(url);
        if(response.status === 200){
          const data = await response.data;
          console.log(data);
          setProducts(data.products);
          setPageCount(data.total);
        } else {
          throw new Error('Requeslt Failed');
        }
      } catch (error){
        console.log(error);
      }
    }
    getData();

    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData: FormData = JSON.parse(storedData);
      console.log('Retrieved data:', parsedData);
    }
  },[controller]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setController((prevController) => ({
      ...prevController,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const handleClickOpen = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      thumbnail: product.thumbnail,
      title: product.title,
      category: product.category,
      availabilityStatus: product.availabilityStatus,
      price: product.price,
      rating: product.rating,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProduct) {
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? { ...product, ...formData } : product
      );
      setProducts(updatedProducts);
      localStorage.setItem('formData', JSON.stringify(updatedProducts));
      console.log('Form data submitted:', formData);
    }
    handleClose();
  };

  return (
    <>
    <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 20 }}>
      <Typography variant="h6">Products</Typography>
      <Avatar/>
    </Paper>
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Product
            </TableCell>
            <TableCell>
              Product Name
            </TableCell>
            <TableCell>
              Product Type
            </TableCell>
            <TableCell>
              Availability
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Rating
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((val) => (
            <TableRow key={val.id}>
              <TableCell>
                <Avatar alt={val.title} src={val.thumbnail} />
              </TableCell>
              <TableCell onClick={() => handleClickOpen(val)} style={{textDecoration: 'underline'}}>
                {val.title}
              </TableCell>
              <TableCell>
                {val.category}
              </TableCell>
              <TableCell style={{color: `${val.availabilityStatus === 'Low Stock' ? 'red' : 'green'}`}}>
                {val.availabilityStatus}
              </TableCell>
              <TableCell>
                {`$${val.price}`}
              </TableCell>
              <TableCell>
                <div className='rating'><span>{val.rating}</span> <GradeIcon style={{ color: '#ffffff', fontSize: '16px' }} /></div>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        onPageChange={handlePageChange}
        page={controller.page}
        count={pageCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>

    <Dialog open={open} onClose={handleClose}>
    <form onSubmit={handleSubmit}>
          <DialogTitle>Update the Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form to product.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="thumbnail"
              name="thumbnail"
              label="Thumbnail"
              type="text"
              fullWidth
              variant="standard"
              value={formData.thumbnail}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="category"
              name="category"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              value={formData.category}
              onChange={handleChange}
            />
             <TextField
              margin="dense"
              id="availabilityStatus"
              name="availabilityStatus"
              label="Availability Status"
              type="text"
              fullWidth
              variant="standard"
              value={formData.availabilityStatus}
              onChange={handleChange}
            />
              <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={formData.price}
              onChange={handleChange}
            />
              <TextField
              margin="dense"
              id="rating"
              name="rating"
              label="Rating"
              type="number"
              fullWidth
              variant="standard"
              value={formData.rating}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
    </Dialog>
    </>
  )
}

export default Home;