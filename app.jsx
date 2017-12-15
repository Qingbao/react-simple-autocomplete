let results = [
    {
        title: 'Names',
        items: [{
            id: 1,
            name: 'a',
            description: 'a'
        }, {
            id: 2,
            name: 'ab',
            description: 'ab'
        }, {
            id: 3,
            name: 'abc',
            description: 'abc'
        }, {
            id: 4,
            name: 'abcd',
            description: 'abcd'
        }, {
            id: 5,
            name: 'abcde',
            description: 'abcde'
        }, {
            id: 6,
            name: 'abcdef',
            description: 'abcdef'
        }]
    },
    {
        title: 'Descriptions',
        items: [{
            id: 1,
            name: 'abbbbbbasdsadsaa',
            description: 'dsadasdsa'
        }, {
            id: 2,
            name: 'asdasdas',
            description: 'dsadsavads'
        }, {
            id: 3,
            name: 'aserwewqewq',
            description: 'bvfgfgf'
        },]
    }
];
class App extends React.Component {

    constructor(props) {
        super(props);

        this.onSearchMouseUp = this.onSearchMouseUp.bind(this);
        this.onSearchBlur = this.onSearchBlur.bind(this);
        this.onSearchFocus = this.onSearchFocus.bind(this);

        this.OnViewAll = this.OnViewAll.bind(this);

        this.state = {
            showAutoComplete: false,
            keyword: '',
            results: []
        };
    }

    onSearchMouseUp(event) {
        let keyword = event.target.value.trim().toLowerCase();
        if (!keyword) {
            if (this.state.showAutoComplete) {
                this.setState({
                    showAutoComplete: false
                });
            }
            return;
        }

        let filtered = this.resultMatch(JSON.parse(JSON.stringify(results)), keyword);
        this.setState({
            keyword: keyword,
            showAutoComplete: true,
            results: filtered
        });
    }

    resultMatch(results, keyword) {
        let filtered = []
        results.forEach(result => {
            let match = {
                title: result.title,
                items: []
            }
            result.items.forEach(item => {
                if (item.name.trim().toLowerCase().indexOf(keyword) !== -1) {
                    match.items.push(item);
                }
            })
            if (match.items.length > 0) {
                filtered.push(match);
            }
        });
        return filtered;
    }

    onSearchBlur() {
        if (this.state.showAutoComplete) {
            setTimeout(() => {
                this.setState({ showAutoComplete: false });
            }, 200);
        }
    }

    onSearchFocus(event) {
        let keyword = event.target.value.trim().toLowerCase();
        if (!keyword) {
            if (this.state.showAutoComplete) {
                this.setState({
                    showAutoComplete: false
                });
            }
            return;
        }
        this.setState({
            keyword: keyword,
            showAutoComplete: true
        });
    }

    OnViewAll(match) {
        console.log(match);
    }

    render() {
        return (
            <div>
                <div className="col-lg-4 mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search"
                            aria-describedby="search-bar"
                            onChange={this.onSearchMouseUp}
                            onBlur={this.onSearchBlur}
                            onFocus={this.onSearchFocus} />
                        <span className="input-group-addon" id="search-bar">
                            <i className="fa fa-search" aria-hidden="true" /></span>
                    </div>
                    {this.state.showAutoComplete ? (
                        <AutoComplete
                            results={this.state.results}
                            keyword={this.state.keyword}
                            OnViewAll={this.OnViewAll} />) : null}
                </div>
            </div>
        )
    }

}

ReactDOM.render(
    <App />,
    document.getElementById("auto-complete")
);
