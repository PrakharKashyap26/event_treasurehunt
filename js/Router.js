export class Router {
    constructor(viewContainerId) {
        this.container = document.getElementById(viewContainerId);
        this.routes = {};
        this.currentRoute = null;
    }

    addRoute(name, renderFunction) {
        this.routes[name] = renderFunction;
    }

    navigate(routeName, context = {}) {
        if (!this.routes[routeName]) {
            console.error(`[ROUTER ERROR] Route not found: ${routeName}`);
            return;
        }

        // Add subtle transition effect
        this.container.style.opacity = 0;
        
        setTimeout(() => {
            this.container.innerHTML = ''; // Clear current view
            this.currentRoute = routeName;
            
            // Render new view
            const viewElement = this.routes[routeName](context);
            if (viewElement) {
                this.container.appendChild(viewElement);
            }
            
            // Fade back in
            this.container.style.opacity = 1;
        }, 200); // 200ms matches the css transition
    }
}
