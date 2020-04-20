import React, {useEffect, useState, useNavigation} from "react";
import { Link, Redirect } from "react-router-dom";
import { Layout, Input, Form, Checkbox, Button, List, Spin } from "antd";
import {useSelector, useDispatch} from "react-redux"
import {MdPerson} from 'react-icons/md';
import {FaClipboard, FaGlobeAmericas} from 'react-icons/fa'
import queryString from "query-string";
import * as actions from "./../../actions";
import InfiniteScroll from 'react-infinite-scroller'
import * as timeago from 'timeago.js';
import {history} from '../../history';
const { Header } = Layout;
export const DataResult = props => {
  const [jobListState, setJobListState] = useState([]);
  const [pageState, setPageState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [thereIsParam, setThereIsParam] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchParam = useSelector(state => state.auth.searchParam);
  const dispatch = useDispatch();
  const jobLists = useSelector(state => state.auth.jobLists);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [goToUrl, setGoToUrl] = useState("")
  let pager;
  useEffect(() => {
    setPageState(0)
    setLoading(true)
  }, [])
  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    } else {
      setLoading(false);
    }
  }, [isLoading])
  useEffect(() => {
    setThereIsParam(false)
    
    if (searchParam.description != "" || searchParam.location != "") {
      setThereIsParam(true)
    }
    if (thereIsParam) {
      let param = Object.assign({}, searchParam, {page: pager}, {search: searchParam.description});
      const withParam = queryString.stringify(param);
      dispatch(actions.searchJobsWithPagingParam(withParam))
    } else {
      dispatch(actions.searchJobsAll());
    }
  }, [searchParam]);
  useEffect(() => {
    setJobListState(jobLists);
  }, [jobLists])
  const handleInfiniteOnLoad = () => {
    let newPageState= pageState+1;
    setPageState(newPageState);
    let param = Object.assign({}, searchParam, {page: newPageState});
    const withParam = queryString.stringify(param);
    dispatch(actions.searchJobsWithPagingParam(withParam))
  }
  const showDetail = (val) => {
    history.push(`/jobdetail/${val.id}`)
    setGoToUrl(`/jobdetail/${val.id}`)
  } 
  return (
    <Layout className="data-result-layout">
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
          <div className="header-data-result">
            {(thereIsParam && jobLists && !isLoading) ? `Showing ${jobLists.length} jobs`: 'Job List'}
          </div>
          <div className="list-data-result">
            <InfiniteScroll
                initialLoad={false}
                pageStart={pageState}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={true}
              >
                {
                  (loading && jobLists.length == 0) ? <Spin className="spin-center"/>
                  :
                  <List
                    dataSource={jobLists}
                    renderItem={item => (
                      <List.Item className="listitem-dataresult" key={item.id} onClick={() => showDetail(item)}>
                        <List.Item.Meta
                          title={item.title}
                          description={<div><span className="company">{item.company}</span><span className="separator"> - </span><span className="fulltime">{item.type}</span></div>}
                        />
                        <div className="content-right">
                          <div className="city">{item.location}</div>
                          <div className="created_at">{timeago.format(item.created_at)}</div>
                        </div>
                      </List.Item>
                    )}
                  >
                    {loading && hasMore && (
                      <Spin className="spin-center"/>
                    )}
                  </List>
                }
              </InfiniteScroll>
          </div>
        </React.Fragment>
      }
    </Layout>
  );
};
