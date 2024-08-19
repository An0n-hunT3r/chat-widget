from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize model and tokenizer
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Track conversation history
conversation_history = []

def get_chatbot_response(user_message: str) -> str:
    global conversation_history
    
    # Add the user's message to the history
    conversation_history.append(f"User: {user_message}")
    
    # Prepare the input with conversation history
    inputs = tokenizer.encode(' '.join(conversation_history), return_tensors="pt")
    
    # Generate response
    outputs = model.generate(
        inputs, 
        max_length=150, 
        num_return_sequences=1,
        temperature=0.7,
        top_k=50,
        pad_token_id=tokenizer.eos_token_id
    )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Add the model's response to the history
    conversation_history.append(f"Bot: {response}")
    
    # Limit conversation history to avoid excessive length
    if len(conversation_history) > 10:
        conversation_history = conversation_history[-10:]
    
    return response

def reset_chatbot():
    global conversation_history
    conversation_history = []
