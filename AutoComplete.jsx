class AutoComplete extends React.Component {
    static propTypes = {
        keyword: PropTypes.string,
        results: PropTypes.array,
        OnViewAll: PropTypes.func
    };
    static defaultProps = {
        keyword: '',
        results: []
    };

    constructor(props) {
        super(props);

        this.OnViewAll = this.OnViewAll.bind(this);
    }

    OnViewAll() {
        this.props.OnViewAll('test');
    }

    render() {
        let matches = [];
        //only show 5 matches
        console.log(this.props.results);
        this.props.results.forEach(result => {
            console.log(result);
            if (result.items.length <= 5) {
                matches.push(<Match title={result.title}
                    items={result.items}
                    keyword={this.props.keyword}
                    length={result.items.length} />);
            } else {
                let items = [];
                for (let i = 0; i < 5; i++) {
                    items.push(result.items[i]);
                }
                matches.push(<Match title={result.title}
                    items={items}
                    keyword={this.props.keyword}
                    length={result.items.length}
                    OnViewAll={this.OnViewAll} />);
            }
        });

        return (
            <div className="card AutoComplete-card">
                {matches}
            </div>
        );
    }
}

class Match extends React.Component {
    static propTypes = {
        keyword: PropTypes.string,
        title: PropTypes.string,
        items: PropTypes.array,
        length: PropTypes.number,
        OnViewAll: PropTypes.func
    };
    static defaultProps = {
        keyword: '',
        title: '',
        items: [],
        length: 0
    };

    constructor(props) {
        super(props);

        this.OnViewAll = this.OnViewAll.bind(this);
    }

    OnViewAll() {
        this.props.OnViewAll(this.props.title);
    }

    getHighlightedText(text, keyword) {
        let parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return <span>{parts.map(part => part.toLowerCase() === keyword.toLowerCase() ? <b>{part}</b> : part)}</span>;
    }

    render() {
        let items = [];
        this.props.items.forEach(item => {
            items.push(
                <li className="list-group-item">
                    <a target="_blank" href={"/details/" + item.id}>
                        <p className="item-name">{this.getHighlightedText(item.name, this.props.keyword)}</p>
                        <p className="text-muted">{this.getHighlightedText(item.description, this.props.keyword)}</p>
                    </a>
                </li>
            );
        });

        return (
            <div className="AutoComplete-match">
                <div className="card-header">
                    <p className="font-weight-bold">{this.props.title}</p>
                    <p>{this.props.length > 5 ? ("5 of " + this.props.length + " matches") : (this.props.length + " matches")}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {items}
                    {this.props.length > 0 ? (
                        <li className="list-group-item view-all-link">
                            <a onClick={this.OnViewAll}>View all matches<span>></span></a>
                        </li>) : null}
                </ul>
            </div>
        );
    }
}
