using Backend.Conexao;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
ConexaoServico.Configurar(configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        policy =>
        {
            policy
                .AllowAnyOrigin()       // libera qualquer origem
                .AllowAnyMethod()       // libera qualquer método (GET, POST, PUT...)
                .AllowAnyHeader();      // libera qualquer header
        });
});
builder.Services.AddControllers();
builder.Services.AddScoped<GeralService>();
builder.Services.AddScoped<MedicosService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
