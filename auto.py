import pyautogui
import time

def auto_type_and_send(message, count, delay=1):
    """
    Automatically types and sends a message at the cursor's location.
    
    Args:
        message (str): The message to send.
        count (int): Number of times to send the message.
        delay (int): Delay between messages in seconds.
    """
    time.sleep(2)  # Time to place the cursor in the chat box
    print("Starting to send messages...")
    
    for i in range(count):
        try:
            # Type the message with a slight delay between keystrokes
            pyautogui.write(message, interval=0.1)
            # Press Enter to sendkya hal h
            pyautogui.press("enter")
            print(f"Message {i + 1} sent successfully")
            time.sleep(delay)  # Wait before sending the next message
        except Exception as e:
            print(f"Error on message {i + 1}: {e}")

# Configuration
message = "Write message"  # Message to send
count = 100  # Number of messages to send
delay_between_messages = 1  # Delay between messages in seconds

auto_type_and_send(message, count, delay_between_messages)