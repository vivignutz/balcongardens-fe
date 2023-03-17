import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

/* Component that includes the form for editing/updating
posts. Includes error handling for input fields*/
function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    name: "",
    description: "",
    image: "",
    plant_type: "unknown",
    difficulty_level: "1",
    email: "",
    city: "",
  });
  const {
    name,
    description,
    image,
    plant_type,
    difficulty_level,
    email,
    city,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  //const currentUser = useCurrentUser();
  //const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const {
          name,
          description,
          plant_type,
          difficulty_level,
          image,
          email,
          city,
          is_owner,
        } = data;

        is_owner
          ? setPostData({
              name,
              description,
              plant_type,
              difficulty_level,
              image,
              email,
              city,
            })
          : history.push("/");
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("plant_type", plant_type);
    formData.append("difficulty_level", difficulty_level);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Plant type</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="plant_type"
          value={plant_type}
          onChange={handleChange}
        >
          <option value="unknown">Unknown</option>
          <option value="amaryllis">Amaryllis</option>
          <option value="begonia">Begonia</option>
          <option value="berries">Berries</option>
          <option value="bulbs">Bulbs</option>
          <option value="chillis">Chillis</option>
          <option value="chinese_money_plant">Chinese money plant</option>
          <option value="dragon_tree">Dragon Tree</option>
          <option value="grape_ivy">Grape Ivy</option>
          <option value="herbs">Herbs</option>
          <option value="hop">Hop</option>
          <option value="monstera_deliciosa">Monstera Deliciosa</option>
          <option value="ornamental">Ornamental</option>
          <option value="salads">Salads</option>
          <option value="suculents">Suculents</option>
          <option value="tomatoes">Tomatoes</option>
          <option value="water_lily">Water Lily</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={handleChange}
          name="description"
          rows={6}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Difficulty level</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="difficulty_level"
          value={difficulty_level}
          onChange={handleChange}
        >
          <option value="1">Low</option>
          <option value="2">Moderate</option>
          <option value="3">High</option>
          <option value="4">Expert</option>
          <option value="5">Almost impossible!</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.city?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />

              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
