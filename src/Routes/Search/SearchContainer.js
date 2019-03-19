import React from "react";
import SearchPresenter from "./SearchPresenter";
import {moviesApi} from "api";
import {tvApi} from "api";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm:"",
        loading: true,
        error: null,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    };

    updateTerm = (event) => {
        const { 
            target: { value }
        } = event;
        // console.log(value); 타이핑 할 때 마다 입력값 찍힘
        this.setState({
            searchTerm: value
        });
    };

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({ loadding: true });
        try {
            const {data: {results: movieResults}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults}} = await tvApi.search(searchTerm);
            this.setState({ movieResults, tvResults });
        } catch {
            this.setState({ error: "Can't find results." });
        } finally {
            this.setState({ loading: false });
        }
    };

    render(){
        const { movieResults, tvResults, searchTerm, loading, error } = this.state;
        return (
            <SearchPresenter 
                movieResults = {movieResults}
                tvResults = {tvResults}
                searchTerm = {searchTerm}
                loading = {loading}
                error = {error}
                handleSubmit = {this.handleSubmit}
                updateTerm = {this.updateTerm}
            />
        );
    }
}