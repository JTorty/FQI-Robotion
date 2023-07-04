import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
from matplotlib.colors import CSS4_COLORS
from matplotlib.animation import FuncAnimation
from obstacles import obstacles
from robots import *
from space import *

# Update time in milliseconds
RATE = 500

def simulation():
    # Set space parameters
    obstacle_color = "grey"

    # Set matplot graph parameters
    fig = plt.figure()
    ax = fig.gca()
    ax.set_aspect('equal')
    ax.set_xlim(1, WIDTH)
    ax.set_ylim(1, HEIGHT)
    ax.xaxis.set_major_locator(MultipleLocator(100))
    ax.yaxis.set_major_locator(MultipleLocator(100))

    # Define the frame update function
    def update(frame):

        # Change the space
        for model, robot in ROBOTS.items():
            displacement = max(int(RATE/1000 * robot.speed), 1)
            move_robot(model, displacement)

        ax.clear()
        # Plot the modifies space
        ax.plot(*space.exterior.xy, color='k',
                linewidth=0.2, linestyle='dashed')
        for obstacle in obstacles:
            ax.fill(*obstacle.exterior.xy, alpha=.8,
                    color=obstacle_color, linewidth=0)

        for model, robot in ROBOTS.items():
            circle = robot.center.buffer(robot.radius, robot.radius)
            ax.fill(*circle.exterior.xy, color=robot.color)
            location = get_pixels(robot.center.x, robot.center.y)
            label = model + '\n' + \
                f'x={round(robot.center.x)}' + '\n' + f'y={round(robot.center.y)}'
            ax.text(robot.center.x, robot.center.y, label, fontsize=8,
                    verticalalignment='center', horizontalalignment='center')

    create_robots(10)
    initialize_positions()
    animation = FuncAnimation(fig, update, interval=RATE, frames=6000)
    plt.show()


simulation()
