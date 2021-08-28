### Questions
#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.
A Pure component can help with performance issues by not re-rendering the component if the state has not changed.
Although we have to be careful because there are cases in which we want the component to update and we have to rember that react does a shallow comparision between the old state and the new one. 

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
The shouldComponentUpdate is a lifecycle method which is used to validate if the component must re-render. Context API might have some issues with components that use shouldComponentUpdate that are within a providers tree because the Context State might not update.  

#### 3. Describe 3 ways to pass information from a component to its PARENT.
We can use some state management solution such as Redux or the React Context API and make the child component do something with the state that the parent is using.
We can pass the functions that update the state as prop to the child components, if we are using hooks we can pass a use state.

#### 4. Give 2 ways to prevent components from re-rendering.
It is possible to use Pure Components and shouldComponentUpdate in class based components and we can use the React.memo() to prevent components from re-rendering if the state does not change.
It is also possible to memoize variables with the useMemo hook which is a way to not re render a component if the variable hasn't changed.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a React feature that we can use to group multiple components without adding new DOM nodes. We can use it with the short syntax (```<> </>```) or with ```<React.Fragment>```.
Every React component must return a structure with a parent node, either a fragment or a simple tag. Components that return structure without a "parent" tag will not work e.g
```
return (
    <p>hello</p>
    <p>world</p>
)
```

#### 6. Give 3 examples of the HOC pattern.
The High Order Components are used for repetitive tasks in which we can prevent code duplication and do things based on business rules.
We can create a HOC to validate if a user has the permission to use some features:
```
withPermission(Component) {
    if (user has permission) {
        return Component
    } else {
        return 'You do not have permission'
    }
}
```
Or a HOC to fetch data from a server and pass the data to its children:
```
withMusics(Musics) {
    return class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            data: []
          };
        }
        
        fetchData = async () => {
            const musics = await fetch('/api/musics')
            this.setState({
                data: [...musics]
            })
        } 
    
        componentDidMount() {
          fetchData()
        }
   
        render() {
          return <Musics data={this.state.data} {...this.props} />;
        }
    }
}
```
And using the HOC
```export default withMusics(MusicList)```

#### 7. What's the difference in handling exceptions in promises, callbacks and async...await.
With promises we have to use the resolving functions ``then()`` and `catch()` where the catch function recieves a callback function in which we can handle the error properly.
```
promise()
    .then()
    .catch((error) => {
        // handle error here or pass a callback function
    })
```

While in async statements we can use try/catch blocks and handle the errors through the catch block.
```
try {
    // do stuff
} catch (error) {
    // handle the errors here
}
```

#### 8. How many arguments does setState take and why is it async.
The setState takes two arguments, the first one can be a function or a object and the second argument is a callback function which is optional.

#### 9. List the steps needed to migrate a Class to Function Component.
 - Change the class to a function
 - Change the state object to variables with useState hooks
 - Change all the `this.setState` to the functions that set the variables
 - Change the lifecycle methods to their equivalent in hooks (e.g componentDidMount to useEffect)
 - Change the state variables in the HTML to the new ones
 - Return the JSX


#### 10. List a few ways styles can be used with components.
We can provide styles to components by adding classes to them through the `className` and importing css files to the component.
It is also possible to create inline styles with the `style` prop.
And finally we can use some styling library such as `styled-components` to create and add styles to components using only JS.

#### 11. How to render an HTML string coming from the server.
We can render an HTML string from server using the `dangerouslySetInnerHTML`.
