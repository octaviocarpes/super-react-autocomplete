import React from "react"
import "./styles.css"
import { debounce } from "../../utils/debounce";
import { fetchPeople } from "../../api";

export class ClassAutoComplete extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            value: "",
            isLoading: false,
            results: [],
            error: false
        }
    }

    fetchData = async (name) => {
        try {
            if (name.length === 0) {
                this.setState({
                    results: []
                })
                return
            }

            this.setState({
                isLoading: true
            })
            const response = await fetchPeople(name)
            const data = await response.json()
            this.setState({
                results: [...data.results.map(result => ({ name: result.name, url: result.url }))]
            })
            this.setState({
                isLoading: false
            })
        } catch (error) {
            this.setState({
                error: true
            })
            console.log(error)
        }
    }

    debounceSearch = debounce((value) => this.fetchData(value), 500)

    handleInput = (value) => {
        this.setSearch(value)
        this.debounceSearch(value)
    }

    setSearch = (value) => {
        this.setState({
            search: value,
            results: []
        })
    }

    getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
    }

    renderResults = () => (
        <ul className={'results'}>
            {this.state.results.map((result, index) => (
                <li
                    onClick={() => this.setSearch(result.name)}
                    className={'item'}
                    key={result.url}
                    tabIndex={index}
                >
                    {this.getHighlightedText(result.name, this.state.search)}
                </li>
            ))}
        </ul>
    )

    render() {
        return (
            <div className={"auto-complete"}>
                {this.state.search ? <label>You have selected: {this.state.search}</label> : <label>Search for a Star Wars Character (Luke, Leia...)</label>}
                <div className={"input"}>
                    <input value={this.state.search} onInput={(event) => this.handleInput(event.target.value)} />
                    { this.state.isLoading ? <img src={"https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bhuerux895q9qmo3xnxg0gjd1t8ar7vxzg212meha&rid=200w.gif&ct=g"} alt={''} /> : null}
                </div>
                { this.state.results.length > 0 ? this.renderResults() : null }
            </div>
        )
    }
}
