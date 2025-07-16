import pandas as pd
import os

dir = ['datacatalogue', 'kpi']

source_dir = ['data-source/' + d for d in dir]
json_dir = ['public/data/' + d for d in dir]

for csv_source_dir, json_output_dir in zip(source_dir, json_dir):

    print(f"Starting conversion from '{csv_source_dir}' to '{json_output_dir}'...")

    # Create the output dir if not exist
    os.makedirs(json_output_dir, exist_ok=True)

    # Loop 
    for filename in os.listdir(csv_source_dir):
        if filename.endswith('.csv'):
            csv_file_path = os.path.join(csv_source_dir, filename)
            json_filename = filename.replace('.csv', '.json')
            json_output_path = os.path.join(json_output_dir, json_filename)
            print(f"  - Converting '{csv_file_path}' to '{json_output_path}'")

            try:
                # Read the CSV file
                df = pd.read_csv(csv_file_path)
                
                # Convert and save to JSON
                df.to_json(json_output_path, orient='records', indent=2)
            except Exception as e:
                print(f"Error converting file {filename}: {e}")

print("Conversion complete.")
