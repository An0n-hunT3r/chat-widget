from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "microsoft/DialoGPT-large"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def get_chatbot_response(user_message: str) -> str:
    inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt")
    
    outputs = model.generate(
        inputs, 
        max_length=1000, 
        pad_token_id=tokenizer.eos_token_id,
        temperature=0.1,  # Controls randomness: lower values are less random
        top_k=50,  # Limits to the top-k tokens with the highest probabilities
        top_p=0.9,  # Top-p (nucleus sampling) chooses from the top 90% probability mass
    )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Removes user_message from generated response
    if response.startswith(user_message):
        response = response[len(user_message):].strip()
    
    return response

# Function can be used to reset chatbot history
# Currently message history is not send as model starts hallucinating
def reset_chatbot():
    """No conversation history to reset in this version."""
    pass
