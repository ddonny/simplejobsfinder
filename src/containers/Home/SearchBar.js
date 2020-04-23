import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Form, Checkbox, Button } from "antd";
import {MdPerson} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {FaClipboard, FaGlobeAmericas} from 'react-icons/fa'
import * as actions from "./../../actions";
const { Header } = Layout;

export const SearchBar = props => {
  const [form] = Form.useForm();
  useEffect(() => {
  }, []);
  const dispatch = useDispatch();
  const onFinish = e => {
    console.log('Finish:', e);
    dispatch(actions.addSearchParam(e))
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log('Finish:', form);
    dispatch(actions.addSearchParam(e))
  }
  
  return (
    // <Layout>
      <Form
          name="searchbarform" 
          layout="inline"
          className="searchbar-form"
          initialValues={{ full_time: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="description"
            label="Job Description"
            className="input-large"
            rules={[
              { required: false }
            ]}
          >
            <Input prefix={<FaClipboard className="icon-jobdesc" color="#D9D9D9" />} placeholder="Filter by title, benefits, companies, expertise" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            className="input-large"
            rules={[
              { required: false }
            ]}
          >
            <Input prefix={<FaGlobeAmericas className="icon-location" color="#D9D9D9" />} placeholder="Filter by city, state, zip code or country" />
          </Form.Item>
          <Form.Item name="full_time" valuePropName="checked" label="">
            <Checkbox><span className="bold-label">Full Time Only</span></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit" className="search-form-button">
              Search
            </Button>
          </Form.Item>
          </Form>
    // </Layout>
  );
};
