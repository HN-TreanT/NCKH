from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
if torch.cuda.is_available():       
    device = torch.device("cuda")

    print('There are %d GPU(s) available.' % torch.cuda.device_count())

    print('We will use the GPU:', torch.cuda.get_device_name(0))
else:
    print('No GPU available, using the CPU instead.')
    device = torch.device("cpu")

model = T5ForConditionalGeneration.from_pretrained("NlpHUST/t5-small-vi-summarization")
tokenizer = T5Tokenizer.from_pretrained("NlpHUST/t5-small-vi-summarization")
model.to(device)

file_path = "demo2.txt"  # Thay đổi đường dẫn tới file của bạn
with open(file_path, "r", encoding="utf-8") as file:
    src = file.read()
tokenized_text = tokenizer.encode(src, return_tensors="pt").to(device)
model.eval()
summary_ids = model.generate(
                    tokenized_text,
                    max_length=256, 
                    num_beams=5,
                    repetition_penalty=2.5, 
                    length_penalty=1.0, 
                    early_stopping=True
                )
output = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
print(output)
