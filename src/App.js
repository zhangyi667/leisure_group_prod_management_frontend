import './App.css';
import {Component} from "react/cjs/react.production.min";
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './product/ProductList';
import EditProduct from "./product/EditProduct";


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/products' exact={true} component={ProductList}/>
                    <Route path='/products/:id' component={EditProduct}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
