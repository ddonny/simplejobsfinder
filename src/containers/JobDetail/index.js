import React, {useEffect, useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Layout, Spin, Breadcrumb, Divider, Col, Row } from "antd";
import {useSelector, useDispatch} from "react-redux"
import {GoArrowLeft} from 'react-icons/go'
import queryString from "query-string";
import * as actions from "../../actions";
import * as timeago from 'timeago.js';
import {Navbar} from './../Home/Navbar'
import {history} from '../../history';
const { Header } = Layout;
export const JobDetail = props => {  
  const dispatch = useDispatch();
  const jobDetailReducer = useSelector(state => state.auth.jobDetail);
  const isLoadingReducer = useSelector(state => state.auth.isLoading);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobDetailState, setJobDetailState] = useState({});
  const [goToUrl, setGoToUrl] = useState("")

  useEffect(() => {
      setLoading(true)
      let currentId = null;
      console.log('history', history)
      let locationStr = history.location.pathname;
      if (locationStr) {
        currentId = locationStr.replace('/jobdetail/', '');
        dispatch(actions.getJobDetail(currentId))
      }
  }, [history])

  useEffect(() => {
    setJobDetailState(jobDetailReducer);
  }, [jobDetailReducer])
  useEffect(() => {
    setLoading(isLoadingReducer);
  }, [isLoadingReducer])

  const handleLogout = () => {
    dispatch(actions.signout());
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const previousPage = () => {
    setGoToUrl(`/home`)
  }
  

  const renderDesc = (desc) => {
    return {
      __html: desc
    }
  }

  return (
    <Layout className="jobdetail-page">
      {
        (goToUrl != "") ?
        <Redirect
          to={{
            pathname: goToUrl,
            from: {
              from: props.location
            }
          }}
        />:
        <React.Fragment>
          <Navbar
              collapsed={collapsed}
              handleClick={toggleCollapse}
              signout={handleLogout}
            />
          <div className="navigation-wrapper">
            <GoArrowLeft className="back-icon" color="#CBCBCB" onClick={previousPage}/>
            <div className="back-text" onClick={previousPage}>Back</div>
          </div>
          <div className="jobdetail-result">
            {(loading) ? 
              <Spin className="spin-center"/>:
              <div className="detail-info">
                <div className="breadcrumb">
                  <Breadcrumb>
                    <Breadcrumb.Item>{jobDetailState.type}</Breadcrumb.Item>
                    <Breadcrumb.Item>{jobDetailState.location}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="jobTitle">
                  {jobDetailState.title}
                </div>
                <Divider />
                <Row>
                  <Col span={16}><div className="description" dangerouslySetInnerHTML={renderDesc(jobDetailState.description)}></div></Col>
                  <Col span={8}>
                    <div className="company-info-box">
                      <div className="title">{jobDetailState.company}</div>
                      <Divider/>
                      <img src={jobDetailState.company_logo} className="company-logo"/>
                      <div className="company-url">{jobDetailState.company_url}</div>
                    </div>
                    <div className="how-to-apply-box">
                      <div className="title">How to apply</div>
                      <Divider/>
                      <div className="how-to-apply-content" dangerouslySetInnerHTML={renderDesc(jobDetailState.how_to_apply)}></div>
                    </div>
                  </Col>
                </Row>
              </div>
            }
          </div>
        </React.Fragment>
      }
    </Layout>
  );
};
