from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Summarizer"


    model_config = SettingsConfigDict(env_file=".env")

settings= Settings()