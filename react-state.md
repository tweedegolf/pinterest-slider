###Introduction

React has increasingly become a popular choice for building complex interactive front-ends. One of the great benefits of React is that we can create reusable components. A component is reusable if it is not hard-wired to the application or to the application state.

Such components are often referred to as dumb components; these components can be rendered without needing any internal logic. They might need some properties that can be passed in from parent components.

This parent component can be another dumb component or a smart component. A smart component has logic that makes decisions which components to render, what data to fetch and might hold (a part of) the application state or listens for state changes.

Apart from dumb opposed to smart you may find other naming pairs such as presentational and container, skinny and fat, stateful and pure, screens and components and so on. I will use component (dumb) and container (smart).

This article discusses a simple application that logs in to your Pinterest account and fetches all your public boards. After selecting a board a slideshow containing all images in that board will start. Before you start the slideshow you are able to set the interval between two successive images.

I have created 3 versions of this application all using a different technology for managing the application state:

1. React with Flux
2. React with Redux
3. React with Relay and GraphQL

Obviously Relay and GraphQL are not designed for managing application state; they are designed for managing data fetching from a server. However since our application requests data from the Pinterest server, and therefor maintains both a local application state based on user interaction and a data state based on what data has been fetched from the server, I thought it would be interesting to add it to the comparison.



###The structure of the app

The code of the application is at [github](https://github.com/abudaan/pinterest-slider2) and a live version can be found [here](https://abumarkub.net/pinterest-slider/).

The application has only one container, this is in line with the recommendations for maintainable and reusable code: to have as little components with state (i.e. containers) as possible. The container is called App and you can find its code in /containers/app.js

Based on a display state the container renders one of the following components:

1. Authorize &rarr; shows a button that leads to a popup where you can login to Pinterest and authorize the application to access your public boards
2. Configure &rarr; lets you choose a board, set the interval between the images and start the slide show
3. ImageSlider &rarr; the slideshow automatically (and infinitely) showing all images in the selected board
4. A plain div showing a progress message

Instead of a display state I could have use [routes](https://github.com/reactjs/react-router) as well.


###The structure of the state

We can define our state a follows:

1. display state
2. selected board
3. selected interval
4. all public boards
5. all images from selected board
6. the index of the current image in the slide show

Number 1 is the overall application state that determines which component to render, and together with number 2 and 3 it is dependent on user interaction. Number 4 and 5 represent the data fetched from the server (i.e. the data state) and number 6 gets updated automatically by `setInterval`.


###Comparing the 3 versions

In the versions that use Flux and Redux both application state and data state are stored in one single store. In the Relay/GraphQL version the data state is stored in Relay and the application state is maintained in the App container itself; because our application state is fairly simple this is acceptable.

If you compare the code of the App container you will see that in all versions the properties and actions needed by the components are passed in from the container, however the way this is done differs.

The code of the Flux and the Redux version look very much the same. The Flux version looks the most clean; by wrapping the App container in a flux Container the App container gets automatically notified of state changes. In the Redux version we need to add that functionality by using a decorator pattern.

Both the Flux and the Redux version use separate actions to alter the state. If you compare the `actions.js` file of both versions you see that they basically only differ in the way they dispatch the actions. Also the files `store.js` where the state is kept look very much the same.

The Relay/GraphQL version is the odd one out here. Because the application state is maintained in the App container itself, this version doesn't need actions and a dispatcher. By wrapping the App container in a Relay container the server data gets automatically fetched and added to the props of the App container.

One important thing to notice is that all components are exactly the same in the 3 versions.


###Conclusion

During coding and refactoring of the 3 versions the leading idea was to make them as much similar to each other as possible. For the Flux and Redux versions I succeeded fairly well but the Relay/GraphQL version is quite something different.

I have cheated a bit by... However to make better use of Relay and GraphQL I should have wrapped both the Configure component and the ImageSlider component into their own Relay containers. That would have allowed a better control of the application flow: as you might have noticed the Relay/GraphQL version skips the Authorize component and the progress messages.

Because the components are completely decoupled they can be used in applications using very different technologies.


It is not either Redux/Flux or Relay, it is and and -> a little note about the pinterest wrapper which makes it not very necessary to use Relay/GraphQL






