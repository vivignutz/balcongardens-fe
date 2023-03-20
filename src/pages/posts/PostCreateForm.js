import React, { useRef, useState } from "react";


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

// Component used for creating a post.
// Takes input from the user in the forms and post it to the API
// Includes error handling that shows an alert to the user.

function PostCreateForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    plant_type: "unknown",
    difficulty_level: "1",
    created_at: "",
    city: "",
  });
  const {
    title,
    image,
    description,
    plant_type,
    difficulty_level,
    created_at,
    city,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

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

    formData.append("title", title);
    formData.append("plant_type", plant_type);
    formData.append("description", description);
    formData.append("difficulty_level", difficulty_level);
    formData.append("created_at", created_at);
    formData.append("city", city);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
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
        <Form.Label>Name of the plant</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
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
          <option value="unknown">Chose one</option>
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
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
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
        <Form.Label>Offered at</Form.Label>
        <Form.Control
          type="date"
          name="created_at"
          value={created_at}
          onChange={handleChange}
          min="2023-01-01"
        />
      </Form.Group>
      {errors?.created_at?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
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
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        type="submit"
      >
        create
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
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Green} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

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

export default PostCreateForm;
